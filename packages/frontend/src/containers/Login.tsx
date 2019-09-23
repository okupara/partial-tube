import * as React from 'react'
import Header from 'components/organisms/Header'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(_ => ({
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

type Props = {
  loginDispatcher: () => void
}

const Login = (props: Props) => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <div className={classes.content}>
        <Button onClick={props.loginDispatcher}>
          <img
            src="/images/btn_google_signin_light_normal_web.png"
            srcSet="/images/btn_google_signin_light_normal_web.png 1x, /images/btn_google_signin_light_normal_web@2x.png 2x"
          />
        </Button>
      </div>
    </>
  )
}

export default Login
