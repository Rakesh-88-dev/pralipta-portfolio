export function getOptimizedCloudinaryUrl(
  url,
  {
    width = 1200,
    quality = "auto",
    format = "auto",
  } = {}
) {
  if (!url || typeof url !== "string") {
    return url;
  }

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  const uploadMarker = "/image/upload/";

  if (!url.includes(uploadMarker)) {
    return url;
  }

  const transformation = `f_${format},q_${quality},w_${width}`;

  return url.replace(
    uploadMarker,
    `${uploadMarker}${transformation}/`
  );
}