import { Field, Form, Formik } from "formik";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch, notify }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (values.query === "") {
          console.log("message Info");
          notify();
        } else {
          onSearch(values.query);
          actions.resetForm();
        }
      }}
    >
      <Form className={css.searchForm}>
        <Field className={css.searchInput} type="text" name="query"></Field>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
