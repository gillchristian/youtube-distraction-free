const pipe = (v, ...fs) => fs.reduce((acc, f) => f(acc), v);

const Maybe = {
  of: value => ({ type: "just", value }),
  nothing: { type: "nothing" },
  fromNullable: value =>
    value === null || value === undefined ? Maybe.nothing : Maybe.of(value),
  map: f => maybe => (maybe.type === "just" ? Maybe.of(f(maybe.value)) : maybe),
  mapNullable: f => maybe =>
    maybe.type === "just" ? Maybe.fromNullable(f(maybe.value)) : maybe,
  chain: f => maybe => (maybe.type === "just" ? f(maybe.value) : maybe),
  do: f => maybe => {
    if (maybe.type === "just") {
      f(maybe.value);
    }
  }
};

const clearNode = id =>
  pipe(
    document.getElementById(id),
    Maybe.fromNullable,
    Maybe.do(node => node.remove())
  );

/*

YouTube markup of bottom countent (there's more, but that's what we care about):

  div#container <-- there are more containers but getElementById selects only the first one \o/
  div#columns
    div#primary
        div#primary-inner
          div#info
          div#meta
    div#secondary

*/

clearNode("secondary");
clearNode("container");

pipe(
  document.getElementById("primary-inner"),
  Maybe.fromNullable,
  Maybe.map(node => [...node.children]),
  Maybe.map(children =>
    children.filter(elem => elem.id !== "info" && elem.id !== "meta")
  ),
  Maybe.do(children => children.forEach(elem => elem.remove()))
);
