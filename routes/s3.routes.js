const express = require("express");
const router = express.Router();

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");

const s3 = require("../config/s3");

/**
 * GET /api/s3/:id
 * ?fileType=image/png
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fileType } = req.query;

    if (!fileType) {
      return res.status(400).json({ error: "fileType is required" });
    }

    // Basic validation (don’t skip this)
    if (!fileType.startsWith("image/")) {
      return res.status(400).json({ error: "Only images allowed" });
    }

    const key = `customer-job/${id}/${uuidv4()}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ChecksumAlgorithm: undefined,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60, // seconds
    });

    res.json({
      uploadUrl,
      key,
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    });
  } catch (err) {
    console.error("Presigned URL error:", err);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

module.exports = router;
