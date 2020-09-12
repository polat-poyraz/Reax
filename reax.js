class ReaxMain {
    constructor (state, methods, historyMode){
        this.contetnControls = {
            history: historyMode
        }
        this.state = state
        this.methods = methods
        this.promise = new Promise((resolve, reject) => { resolve(this); reject('Opps.')})
        this.historyData = []

        // lifecycle
        this.methods.firedBefore(this.promise)
    }
    updateState (param){
        for (const prop in param){
            if (this.state[prop] === undefined){
                this.state[prop] = param[prop]
                this.history('add', prop)
            } else {
                this.state[prop] = param[prop]
                this.history('update', prop)
            }
        }
    }
    removeState (prop){
        for (let i = 0; i < prop.length; i++){
            if(this.state[prop[i]] !== undefined){
                this.history('remove', prop)
                delete this.state[prop[i]]
            }
        }
    }
    viewStateDetail (){
        let strings = {}
        let numbers = {}
        let booleans = {}
        let length = 0
        
        for (const prop in this.state){
            if (typeof this.state[prop] == 'string'){
                strings[prop] = this.state[prop]
            } else if (typeof this.state[prop] == 'number'){
                numbers[prop] = this.state[prop]
            } else if (typeof this.state[prop] == 'boolean'){
                booleans[prop] = this.state[prop]
            }
            length++
        }
        console.log('allStateLength : ', length)        
        console.log('Strings : ', strings)
        console.log('Numbers : ', numbers)
        console.log('Booleans : ', booleans)
    }
    history (mode, prop){
        if (this.contetnControls.history || this.contetnControls.history === undefined){
            let after = {}
            if (mode === 'add'){
                after['history'] = `${mode} = ${prop}: ${this.state[prop]}`
            } else if (mode === 'update'){
                after['history'] = `${mode} = ${prop}: ${this.state[prop]}`
            } else if (mode === 'remove'){
                after['history'] = `${mode} = ${prop[0]}: ${this.state[prop[0]]}`
            }
            this.historyData.push(after)

            if (this.historyData.length >= 2){
                if (this.historyData[this.historyData.length-1].history === this.historyData[this.historyData.length-2].history){
                    this.historyData.splice((this.historyData.length-1), 1)
                }
            } 
        }
    }
}

const Reax = new ReaxMain(/*state*/{}, /*methods*/{}, /*history*/true)
