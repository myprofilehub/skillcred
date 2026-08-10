"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, Video as VideoIcon } from "lucide-react";
import { toast } from "sonner";

interface MediaRecorderProps {
  token: string;
  type: string;
  isVideo?: boolean;
  maxDurationSeconds: number;
  autoStartDelaySeconds?: number;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export function AssessmentMediaRecorder({
  token,
  type,
  isVideo = false,
  maxDurationSeconds,
  autoStartDelaySeconds = 0,
  onUploadComplete,
  label
}: MediaRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(maxDurationSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Recording countdown timer
  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isRecording && timeLeft === 0) {
      stopRecording();
    }
  }, [isRecording, timeLeft]);

  const initMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: isVideo
      });
      streamRef.current = stream;
      
      if (isVideo && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaReady(true);
      setMediaError(null);
      return true;
    } catch (err: any) {
      if (err.name === 'NotFoundError') {
        setMediaError("Camera or microphone not found. Please connect a device and try again.");
        toast.error("Camera or microphone not found. Please connect a device.");
      } else if (err.name === 'NotAllowedError') {
        setMediaError("Permission denied. Please allow camera/microphone access and try again.");
        toast.error("Microphone/Camera permissions denied. Please enable them.");
      } else {
        setMediaError("Could not access media devices. Please check your browser settings.");
        toast.error("Could not access media devices.");
      }
      console.error(err);
      return false;
    }
  }, [isVideo]);

  const handleStartRecording = async () => {
    if (!mediaReady) {
      const success = await initMedia();
      if (!success) return;
    }

    startRecording();
  };

  const startRecording = () => {
    if (!streamRef.current) {
      toast.error("Media stream not available. Click 'Start Recording' to try again.");
      return;
    }

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: isVideo ? 'video/webm' : 'audio/webm'
    });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      setIsRecording(false);
      setIsUploading(true);
      
      // Stop the stream tracks after recording
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        setMediaReady(false);
      }
      
      const blob = new Blob(chunksRef.current, {
        type: isVideo ? 'video/webm' : 'audio/webm'
      });
      
      const formData = new FormData();
      formData.append("file", blob, isVideo ? "video.webm" : "audio.webm");
      formData.append("token", token);
      formData.append("type", type);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        
        if (data.success) {
          setIsFinished(true);
          onUploadComplete(data.url);
        } else {
          toast.error(data.error || "Upload failed");
        }
      } catch (e) {
        toast.error("Failed to upload recording.");
      } finally {
        setIsUploading(false);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  if (isFinished) {
    return (
      <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800">
        Recording submitted successfully.
      </div>
    );
  }

  return (
    <div className="space-y-4 border border-slate-200 dark:border-white/10 rounded-xl p-4 bg-slate-50 dark:bg-white/5">
      {label && <h4 className="font-semibold text-slate-900 dark:text-white">{label}</h4>}
      
      {isVideo && mediaReady && (
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>REC</span>
            </div>
          )}
        </div>
      )}

      {mediaError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {mediaError}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isVideo ? (
            <VideoIcon className="w-5 h-5 text-slate-500" />
          ) : (
            <Mic className="w-5 h-5 text-slate-500" />
          )}
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {isRecording ? (
              `Recording... ${timeLeft}s remaining`
            ) : isUploading ? (
              "Uploading..."
            ) : (
              "Click to start recording"
            )}
          </span>
        </div>

        {!isRecording && !isUploading && (
          <Button onClick={handleStartRecording} className="bg-blue-600 hover:bg-blue-700">
            {mediaError ? "Retry" : "Start Recording"}
          </Button>
        )}

        {isRecording && (
          <Button onClick={stopRecording} variant="destructive">
            Finish Early
          </Button>
        )}

        {isUploading && (
          <Button disabled variant="outline">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading
          </Button>
        )}
      </div>
    </div>
  );
}
