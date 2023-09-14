const { base64MimeType } = require("./base64");
const S3 = require("aws-sdk/clients/s3.js");
const url = require("url");

const s3 = new S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.R2_ACCESS_KEY}`,
  secretAccessKey: `${process.env.R2_SECRET_ACCESS_KEY}`,
  signatureVersion: "v4",
});

const uploadToStorage = async ({ filename, file }) => {
  const buffer = Buffer.from(file.split(",")[1], "base64");

  const mimType = base64MimeType(file);

  if (!mimType) return;

  const params = {
    Bucket: `${process.env.R2_BUCKET_NAME}`,
    Key: filename,
    Body: buffer,
    ContentType: mimType,
  };

  return await s3
    .upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      return data;
    })
    .promise();
};

const signURL = (fileURL) => {
  if (!fileURL) {
    return fileURL;
  }

  const { path } = url.parse(fileURL);

  if (path) {
    return s3.getSignedUrl("getObject", {
      Bucket: `${process.env.R2_BUCKET_NAME}`,
      Key: path.replace("/", ""),
      Expires: 60 * 60,
    });
  }
};

module.exports = { uploadToStorage, signURL };
