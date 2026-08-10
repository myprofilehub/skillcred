"use client";

import { useState, useEffect, useRef } from "react";
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
  const [delayLeft, setDelayLeft] = useState(autoStartDelaySeconds);
  const [isFinished, setIsFinished] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Request permissions on mount to ensure readiness
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: isVideo
        });
        streamRef.current = stream;
        
        if (isVideo && videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        toast.error("Microphone/Camera permissions denied. Please enable them.");
        console.error(err);
      }
    };

    initMedia();

    return () => {
      // Cleanup stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideo]);

  useEffect(() => {
    if (delayLeft > 0) {
      const timer = setTimeout(() => setDelayLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (delayLeft === 0 && !isRecording && !isFinished && !isUploading) {
      startRecording();
    }
  }, [delayLeft, isRecording, isFinished, isUploading]);

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isRecording && timeLeft === 0) {
      stopRecording();
    }
  }, [isRecording, timeLeft]);

  const startRecording = () => {
    if (!streamRef.current) {
      toast.error("Media stream not available.");
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
      
      {isVideo && (
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

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isVideo ? (
            <VideoIcon className="w-5 h-5 text-slate-500" />
          ) : (
            <Mic className="w-5 h-5 text-slate-500" />
          )}
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {delayLeft > 0 ? (
              `Recording starts in ${delayLeft}s...`
            ) : isRecording ? (
              `Recording... ${timeLeft}s remaining`
            ) : isUploading ? (
              "Uploading..."
            ) : (
              "Ready to record"
            )}
          </span>
        </div>

        {delayLeft === 0 && !isRecording && !isUploading && autoStartDelaySeconds === 0 && (
          <Button onClick={startRecording} className="bg-blue-600 hover:bg-blue-700">
            Start Recording
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
