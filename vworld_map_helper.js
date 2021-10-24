

let mapOptions = new vw.MapOptions(
    vw.BasemapType.GRAPHIC,
    "",
    "FULL",
    "BASIC",
    false,
    new vw.CameraPosition(
        new vw.CoordZ(127.425, 38.196, 13487000),
        new vw.Direction(-90, 0, 0)
    ),
    new vw.CameraPosition(
        new vw.CoordZ(127.425, 38.196, 1548700),
        new vw.Direction(0, -90, 0)
    )
);

let vmap = new vw.Map("vmap", mapOptions);
