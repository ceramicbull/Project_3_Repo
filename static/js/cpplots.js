console.log("test");

const shapesApi = "/api/v1.0/shapes";

d3.json(shapesApi).then(function (data) {
    console.log(data);
})






