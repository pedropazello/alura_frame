class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory.e_funcao(target[prop])) {

                    return function() {
                        console.log(`método '${prop}' interceptado`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                  target[prop] = value;
                  acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static e_funcao(val) {
       return typeof(val) == typeof(Function);
    }
}
