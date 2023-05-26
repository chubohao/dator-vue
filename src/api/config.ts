const env = import.meta.env.MDOE || 'dev'

const envConfig = {
    dev: {
        baseApi: 'http://localhost:8000',
    },
    prod: {
        baseApi: 'example.com/api',
    }
}

export default {
    env,
    ...envConfig["dev"]
}