FNAME=$1
DST_FNAME="${FNAME}.tiled.pyramidal.tif"
# vips tiffsave --tile --pyramid --depth VIPS_FOREIGN_DZ_DEPTH_ONETILE "$FNAME" "$DST_FNAME" 
vips tiffsave --tile --pyramid --depth VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL "$FNAME" "$DST_FNAME" 

