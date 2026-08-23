function greet(name: string):string  { 
    return ('hello' + name)

    const t = greet('jhon');
    console.log(t);
}



function greet1(name: string): string{

    return ('hello ji' + name.toUpperCase);
    
}

function abcd1(count: number): number {     
    return (55 + count)
}

function abcd(name = 'kite') { 
    console.log('hello' + abcd);
}


const gf = (name: string) => { 
    console.log('hello' + name)
}


function mult(...names: string[]) { 
    names.forEach(name =>){ 
        gf(name);
    }

}