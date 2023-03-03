import { Button, Card, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { IActivity } from "../../../App/models/activity";
import { useStore } from "../../../App/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../App/common/form/MyTextInput";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import categoryOptions from "../../../App/common/options/categoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";
import { v4 as uuid } from "uuid";


const ActivityForm = () => {

  const {activityStore} = useStore()

  const {
    selectedActivity,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  // so we can get the id from the root parameters
  const {id} = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  // this yup object is gonna take our properties in our form and use this to validate them
  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required("Category is required"),
    date: Yup.date().required("Date is required").nullable(),
    venue: Yup.string().required("Venue is required"),
    city: Yup.string().required("City is required")
  })

  useEffect(() => {
    // the ! is a non-null assertion operator, it tells typescript that the activity is not null
    // above we are setting the activity to an object with empty strings, so it's not null
    if(id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: IActivity) => {
    // if there is an id, then we are updating an activity
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    }



  if (loadingInitial) return <LoadingComponent />;
  return (
    <Box width="80%" maxWidth={1000} mt={5}>
      <Card sx={{ padding: "1em 2.5em 1em 1em" }}>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={activity}
          onSubmit={(values) => console.log(values)}
        >
          {/* formik provides us render props */}
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <MyTextInput name="title" placeholder="Title" />
              <MyTextArea
                name="description"
                placeholder="Description"
                rows={3}
              />
              <MySelectInput
                options={categoryOptions}
                name="category"
                label="Category"
                placeholder="Category"
              />
              <MyTextInput name="city" placeholder="City" />
              <MyTextInput name="venue" placeholder="Venue" />
              <MyDateInput
                name="date"
                placeholderText="Date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mr: 1, float: "right" }}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 1.5, mr: 1, float: "right" }}
                // esta es otra forma, no necesitamos wrap el botón, simplemente le indicamos que se comportará como un Navlink
                component={Link}
                // y que va a /activities
                to={"/activities"}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default observer(ActivityForm);
