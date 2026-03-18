import { google } from "googleapis";
import { Readable } from "stream";
import path from "path";

// Define the parent folder ID where the uploads should go
const DRIVE_FOLDER_ID = "0ALvbQP4SrLOYUk9PVA";

export async function uploadToDrive({ filename, mimeType, buffer }: { filename: string, mimeType: string, buffer: Buffer | ArrayBuffer }) {
    // 1. Auth to Google using Service Account credentials
    // The keyFile path is relative to the root of the project where `google-credentials.json` sits
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(process.cwd(), "google-credentials.json"),
        scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive']
    });

    const oAuth2Client = await auth.getClient();

    const drive = google.drive({ version: 'v3', auth: oAuth2Client as any });

    // 2. Upload File to the specific folder
    const fileMetadata = { 
        name: filename,
        parents: [DRIVE_FOLDER_ID]
    };
    
    // Convert Buffer or ArrayBuffer to Node stream
    const bs = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer as ArrayBuffer);
    const media = {
        mimeType: mimeType,
        body: Readable.from(bs)
    };

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink, webContentLink',
        supportsAllDrives: true
    });

    const fileId = response.data.id;
    if (!fileId) throw new Error("Failed to create file");

    // 3. Set Permissions (make the specific file accessible via link)
    await drive.permissions.create({
        fileId: fileId,
        requestBody: { role: 'reader', type: 'anyone' },
        supportsAllDrives: true
    });

    return {
        id: fileId,
        webViewLink: response.data.webViewLink,
        webContentLink: response.data.webContentLink
    };
}
