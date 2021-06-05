import { route as user } from './user/routing'
import { route as product } from './product/routing'
import { route as receipt } from './receipt/routing'

class InitRoute {
    constructor(app){
        this.app = app
    }

    routeApi = () => {
        this.app.use('/api/v1/user', user)
        this.app.use('/api/v1/product', product)
        this.app.use('/api/v1/receipt', receipt)
    }
}

export default InitRoute