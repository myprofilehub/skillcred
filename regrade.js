"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var generative_ai_1 = require("@google/generative-ai");
var server_1 = require("@google/generative-ai/server");
var path_1 = require("path");
var fs_1 = require("fs");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var API_KEY = process.env.GEMINI_API_KEY || "";
var genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
var fileManager = new server_1.GoogleAIFileManager(API_KEY);
var prisma = new client_1.PrismaClient();
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
function uploadMediaToGemini(urlPath, mimeType) {
    return __awaiter(this, void 0, void 0, function () {
        var cleanPath, localPath, uploadResult, file, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!API_KEY)
                        return [2 /*return*/, null];
                    cleanPath = urlPath.startsWith("/") ? urlPath.substring(1) : urlPath;
                    localPath = (0, path_1.join)(process.cwd(), "public", cleanPath);
                    if (!(0, fs_1.existsSync)(localPath))
                        return [2 /*return*/, null];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, fileManager.uploadFile(localPath, {
                            mimeType: mimeType,
                            displayName: urlPath.split('/').pop(),
                        })];
                case 2:
                    uploadResult = _a.sent();
                    return [4 /*yield*/, fileManager.getFile(uploadResult.file.name)];
                case 3:
                    file = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(file.state === "PROCESSING")) return [3 /*break*/, 7];
                    return [4 /*yield*/, delay(2000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, fileManager.getFile(uploadResult.file.name)];
                case 6:
                    file = _a.sent();
                    return [3 /*break*/, 4];
                case 7:
                    if (file.state === "FAILED")
                        return [2 /*return*/, null];
                    return [2 /*return*/, uploadResult.file.uri];
                case 8:
                    error_1 = _a.sent();
                    console.error("Error uploading:", error_1);
                    return [2 /*return*/, null];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var a, urls, uris, _i, urls_1, url, _a, _b, scores, model, i, prompt_1, res, j, e_1, cumulativeScore, cumulativeFeedback, finalPrompt, cumResult, cumJson, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prisma.counselorAssessment.findFirst({ where: { candidateEmail: "gmsai35@gmail.com" } })];
                case 1:
                    a = _c.sent();
                    if (!a) {
                        console.log("Not found");
                        return [2 /*return*/];
                    }
                    urls = [a.objection1Url, a.objection2Url, a.objection3Url, a.objection4Url, a.objection5Url, a.objection6Url];
                    console.log("Uploading files...");
                    uris = [];
                    _i = 0, urls_1 = urls;
                    _c.label = 2;
                case 2:
                    if (!(_i < urls_1.length)) return [3 /*break*/, 7];
                    url = urls_1[_i];
                    if (!url) return [3 /*break*/, 5];
                    console.log("Uploading", url);
                    _b = (_a = uris).push;
                    return [4 /*yield*/, uploadMediaToGemini(url, "video/webm")];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, delay(5000)];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    uris.push(null);
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    scores = [null, null, null, null, null, null];
                    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });
                    console.log("Grading videos...");
                    i = 0;
                    _c.label = 8;
                case 8:
                    if (!(i < uris.length)) return [3 /*break*/, 14];
                    if (!uris[i]) return [3 /*break*/, 13];
                    prompt_1 = "Watch this video of a sales counselor handling Objection ".concat(i + 1, ". Evaluate their body language, confidence, tone, and spoken response. Provide a score from 1 to 5. Format exactly as JSON: {\"score\": <number>}");
                    _c.label = 9;
                case 9:
                    _c.trys.push([9, 12, , 13]);
                    console.log("Generating score for video ".concat(i + 1, "..."));
                    return [4 /*yield*/, model.generateContent([prompt_1, { fileData: { fileUri: uris[i], mimeType: "video/webm" } }])];
                case 10:
                    res = _c.sent();
                    j = JSON.parse(res.response.text());
                    scores[i] = j.score;
                    console.log("Score ".concat(i + 1, ": ").concat(j.score));
                    return [4 /*yield*/, delay(5000)];
                case 11:
                    _c.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_1 = _c.sent();
                    console.error("Video ".concat(i + 1, " grading error:"), e_1.message);
                    return [3 /*break*/, 13];
                case 13:
                    i++;
                    return [3 /*break*/, 8];
                case 14:
                    console.log("Calculating cumulative...");
                    cumulativeScore = null;
                    cumulativeFeedback = null;
                    finalPrompt = "Provide a final cumulative assessment for this candidate.\nThey scored:\n- Voice: 3 out of 5\n- Empathy: Checked in Section 2.\n- Video Objection Scores: ".concat(JSON.stringify(scores), " out of 5.\nProvide a cumulative Score from 0 to 100, and a 2-3 sentence final feedback verdict on whether they should be hired.\nFormat exactly as JSON: {\"score\": <number>, \"feedback\": \"<string>\"}");
                    _c.label = 15;
                case 15:
                    _c.trys.push([15, 17, , 18]);
                    return [4 /*yield*/, model.generateContent(finalPrompt)];
                case 16:
                    cumResult = _c.sent();
                    cumJson = JSON.parse(cumResult.response.text());
                    cumulativeScore = cumJson.score;
                    cumulativeFeedback = cumJson.feedback;
                    console.log("CumScore:", cumulativeScore, "Feedback:", cumulativeFeedback);
                    return [3 /*break*/, 18];
                case 17:
                    err_1 = _c.sent();
                    console.error("Cumulative grading error:", err_1.message);
                    return [3 /*break*/, 18];
                case 18: return [4 /*yield*/, prisma.counselorAssessment.update({
                        where: { id: a.id },
                        data: {
                            objection1Score: scores[0], objection2Score: scores[1], objection3Score: scores[2],
                            objection4Score: scores[3], objection5Score: scores[4], objection6Score: scores[5],
                            cumulativeScore: cumulativeScore,
                            cumulativeFeedback: cumulativeFeedback
                        }
                    })];
                case 19:
                    _c.sent();
                    console.log("Updated in DB!");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error).finally(function () { return prisma.$disconnect(); });
