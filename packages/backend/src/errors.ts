import {ApolloError} from "apollo-server-cloud-functions"
import {ErrorTags} from "@partial-tube/domain/lib/EnsureAuthedUser"

class InvalidTokenError extends ApolloError {
    constructor() {
        super("You put a invalid token or expired token, please login again", ErrorTags.InvalidTokenError)
    }
}

export {
    InvalidTokenError
}
