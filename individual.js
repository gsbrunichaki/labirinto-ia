class Individual {
    constructor(name) {
        this.name = name;
    }

    hello() {
        return `Hello ${this.name}`;
    }
}

module.exports = Individual;