FNAME=$1
DST_FNAME="${FNAME}.tiled.pyramidal.lzw.tif"

#aws s3 cp "s3://floating-world/${FNAME}" source-image.tif
vips tiffsave --tile --pyramid --depth VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL --compression=VIPS_FOREIGN_TIFF_COMPRESSION_LZW "$FNAME" "$DST_FNAME" 
#aws s3 cp "$DST_FNAME" "s3://floating-world/${DST_FNAME}"
