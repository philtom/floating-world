FNAME=$1
DST_FNAME="${FNAME}.tiled.pyramidal.tif"

aws s3 cp "s3://floating-world/${FNAME}" source-image.tif
vips tiffsave --tile --pyramid --depth VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL source-image.tif "$DST_FNAME" 
aws s3 cp "$DST_FNAME" "s3://floating-world/${DST_FNAME}"
