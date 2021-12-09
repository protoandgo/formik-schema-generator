// Util to register new input components into the formik builder
const Registry = () => {
  // Mapppings
  let mapping: { [x: string]: (...props: any) => JSX.Element } = {};
  // Get component
  const get = (name: string): (...props: any) => JSX.Element => {
    const o = mapping[name];
    // console.log("got " + o);
    if (o === null) return ((props: any) => (<span style={{ color: "red" }}>No component registered as {name}</span>));
    return o;
  };
  // Register component
  const register = (name: string, o: (...props: any) => JSX.Element) => {
    mapping = {...mapping, [name]: o};
  };
  const registerAll = (o: {[x: string]: (...props: any) => JSX.Element}) => {
    Object.entries(o).forEach(([k, v]) => {
      // switch (k) {
      //   case "ArrayInput":
      //     if (v.hasOwnProperties)
      //     break;
      
      //   default:
      //     break;
      // }
      // if (Object.keys(v.arguments).length > 1) console.log("Can't register a component that accepts more than one prop");
      // else 
      register(k, v);
    });
  };
  // Return functions
  return {
    get: get,
    register: register,
    registerAll: registerAll,
  }
}

export const registry = Registry();