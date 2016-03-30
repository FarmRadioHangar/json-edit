
function buildPatch(path, value) {
  if (!path.length)
    return {}
  return {
    [ path[0] ] : 1 === path.length 
	? value 
	: buildPatch(path.slice(1), value)
  }
}

var r = buildPatch(["tigo1", "imei"], "hello");

console.log(r);
