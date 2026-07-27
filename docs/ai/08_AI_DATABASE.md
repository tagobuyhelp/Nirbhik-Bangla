# 08 - AI Database Schema

To support the AI layer, the MongoDB schemas need to store AI-generated metadata.

## 1. `Article` Schema Additions
```javascript
aiSummary: {
  short: { type: String },
  bullet: { type: [String] }
},
socialCaptions: {
  facebook: { type: String },
  twitter: { type: String },
  whatsapp: { type: String },
  telegram: { type: String }
},
imageMetadata: {
  altText: { type: String },
  caption: { type: String },
  credit: { type: String }
},
factCheck: {
  score: { type: Number },
  verdict: { type: String },
  warnings: { type: [String] }
},
aiGenerated: { type: Boolean, default: false } // Tracks if content was fully AI generated
```

## 2. `AILog` Schema (New Collection)
Track every AI execution for billing, auditing, and performance monitoring.

```javascript
const AILogSchema = new mongoose.Schema({
  service: { type: String, required: true }, // 'AISEOService'
  promptName: { type: String, required: true }, // 'seo.prompt.js'
  model: { type: String, default: 'gemini-2.5-flash' },
  usage: {
    promptTokens: Number,
    completionTokens: Number,
    totalTokens: Number
  },
  executionTimeMs: Number,
  status: { type: String, enum: ['SUCCESS', 'ERROR', 'CACHED', 'RATE_LIMITED'] },
  errorMessage: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetId: { type: mongoose.Schema.Types.ObjectId } // PostId or CategoryId
}, { timestamps: true });
```
