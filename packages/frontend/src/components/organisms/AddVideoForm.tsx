// import * as React from 'react'
// import { makeStyles, Theme } from '@material-ui/core/styles'
// import { FieldProps, Formik, Form, Field, FormikProps } from 'formik/dist/index'
// import { isLeft } from 'fp-ts/lib/Either'
// import * as AddVideo from '@partial-tube/domain/lib/workflow/AddVideo'
// import URLTextField from 'components/molecules/URLTextField'
// import TextArea from 'components/molecules/TextArea'
// import { loadedExixtedVideo } from '@partial-tube/domain/lib/workflow/AddVideo'
// import TimerangeFieldArray from 'components/molecules/TimerangeFieldArray'
// import Button from '@material-ui/core/Button'

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     paddingTop: theme.spacing(4),
//     width: 640
//   },
//   formContainer: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   text: {
//     width: '100%'
//   },
//   timerange: {
//     marginTop: theme.spacing(2)
//   },
//   endButton: {
//     padding: '1px 16px'
//   },
//   spaceEachForm: {
//     marginTop: theme.spacing(3),
//     display: 'block'
//   },
//   submitButtonWrapper: {
//     textAlign: 'center'
//   },
//   submitButton: {
//     marginTop: theme.spacing(4),
//     width: theme.spacing(20)
//   }
// }))

// type Form = {
//   url: {
//     value: string
//     errors: AddVideo.VideoUrlErrors
//   }
//   videoId: {
//     value: string
//     errors: AddVideo.VideoUrlErrors
//   }
//   timers: {
//     value: ReadonlyArray<{ start: number; end: number }>
//     errors: Error
//   }
// }

// type FormInput = { [K in keyof Form]: Form[K]['value'] }
// type ErrorFormProps = { [K in keyof Form]?: Form[K]['errors'] }

// const validate = (values: FormInput) => {
//   const errors: ErrorFormProps = {}
//   // TODO: using reduce?
//   const resUrl = AddVideo.validateVideoUrl(values.url)
//   if (isLeft(resUrl)) errors.url = resUrl.left
//   return errors
// }

// const validateUrl = (
//   v: string,
//   previousValue: string,
//   setFieldValue: FormikProps<FormInput>['setFieldValue'],
//   searchDispatcher: (vidoeId: string) => void
// ) => {
//   const resUrl = AddVideo.validateVideoUrl(v)
//   if (isLeft(resUrl)) return resUrl.left
//   else if (previousValue !== resUrl.right) {
//     setFieldValue('videoId', resUrl.right)
//     searchDispatcher(resUrl.right)
//   }
//   return
// }

// type Props = {
//   videoExistance: AddVideo.ExistedVideo
//   searchDispatcher: (videoId: string) => void
//   refForYoutube: React.MutableRefObject<HTMLDivElement | null>
//   currentPlayerTime: number
// }

// const AddVideoForm = (props: Props) => {
//   const classes = useStyles()
//   return (
//     <div className={classes.root}>
//       <Formik<FormInput>
//         initialValues={{
//           url: '',
//           videoId: '',
//           timers: [{ start: 0, end: 0 }]
//         }}
//         onSubmit={() => {}}
//         validate={validate}
//         render={({ errors, setFieldValue, values }) => (
//           <Form className={classes.formContainer}>
//             <Field
//               name="url"
//               validate={(v: string) =>
//                 validateUrl(
//                   v,
//                   values.videoId,
//                   setFieldValue,
//                   props.searchDispatcher
//                 )
//               }
//               render={({ field, form }: FieldProps<FormInput>) => (
//                 <URLTextField
//                   field={field}
//                   error={!!errors.url}
//                   errorMessage="Invalid url"
//                 />
//               )}
//             />
//             {loadedExixtedVideo ? (
//               <>
//                 <div
//                   className={classes.spaceEachForm}
//                   ref={props.refForYoutube}
//                 />
//                 <TimerangeFieldArray
//                   className={classes.timerange}
//                   values={values.timers}
//                   name="timers"
//                 />
//                 <TextArea className={classes.text} label="Description" />
//                 <div className={classes.submitButtonWrapper}>
//                   <Button className={classes.submitButton} variant="outlined">
//                     SAVE
//                   </Button>
//                 </div>
//               </>
//             ) : null}
//           </Form>
//         )}
//       />
//     </div>
//   )
// }

// export default AddVideoForm
