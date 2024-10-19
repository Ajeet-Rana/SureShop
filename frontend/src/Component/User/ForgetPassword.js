import React, { Fragment, useState, useEffect } from "react";
import "./ForgetPassword.css";
import Loader from "../layout/Loader/loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgetPassword } from "../../action/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [email, setEmail] = useState("");

  const forgetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgetPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forget Password" />
          <div className="forgetPasswordContainer">
            <div className="forgetPasswordBox">
              <h2 className="forgetPasswordHeading">Forget Password</h2>

              <form
                className="forgetPasswordForm"
                onSubmit={forgetPasswordSubmit}
              >
                <div className="forgetPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgetPassword;
