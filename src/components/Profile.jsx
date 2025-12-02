import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faEdit,
  faFire,
  faUtensils,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/profile.css";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { toast } from "sonner";

import { useUser } from "../context/AuthContext";

const Profile = () => {
  const { user, profileData, setProfileData, loading } = useUser();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (user) {
      const userRef = doc(db, "userProfiles", user.uid);

      const { isAdmin, ...safeData } = profileData;

      try {
        await updateDoc(userRef, safeData);
        setEditMode(false);
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error("Error updating profile");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Error during logout");
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!currentPassword || !newPassword) {
        toast.warning("Please enter current and new password");
        return;
      }

      if (newPassword.length < 8) {
        toast.warning("Password must be at least 8 characters");
        return;
      }

      if (!/[A-Z]/.test(newPassword)) {
        toast.warning("Password must contain at least one uppercase letter");
        return;
      }

      if (!/[0-9]/.test(newPassword)) {
        toast.warning("Password must contain at least one number");
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success("Password changed successfully");
      setNewPassword("");
      setCurrentPassword("");
      setShowPasswordChange(false);
    } catch (error) {
      // console.error(error);
      toast.error("Error changing password");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="profile">
      <div className="container">
        <div className="p-header">
          <h2>Profile</h2>

          <p>view all your profile details here</p>
        </div>
        <div className="main">
          <div data-aos="fade-up" className="left">
            <div className="l-m">
              <div className="content">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <div className="text">
                  <h2>
                    welcome, {profileData.displayName || "No Name"}
                    {profileData.isAdmin === true ? (
                      <FontAwesomeIcon icon={faCheck} className="icon-admin" />
                    ) : (
                      ""
                    )}
                  </h2>
                  <p>
                    {" "}
                    role : {profileData.isAdmin === true ? "admin" : "user"}
                  </p>
                </div>
              </div>
              <div>
                <button onClick={handleLogout}>Log Out</button>

                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                >
                  Change Password
                </button>
              </div>
              <div className="ch-pass">
                {showPasswordChange && (
                  <div className="change-pass">
                    <h4>Change Password</h4>
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleChangePassword}>Save</button>
                  </div>
                )}
              </div>
            </div>
            <div className="l-f">
              <div className="p-footer">
                <Link to="/#calories">
                  <div className="box">
                    <div className="p-left">
                      <FontAwesomeIcon icon={faFire} className="c-icon" />
                    </div>
                    <div className="p-right">
                      <h4>Calories</h4>
                      <p>CaloriesCalculator</p>
                    </div>
                  </div>
                </Link>
                {profileData.isAdmin ? (
                  <Link to="/dashboard">
                    <div className="box">
                      <div className="p-left">
                        <FontAwesomeIcon
                          icon={faDashboard}
                          className="c-icon"
                        />
                      </div>
                      <div className="p-right">
                        <h4>Dashboard</h4>
                        <p>AdminDashboard</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link to="/foods">
                    <div className="box">
                      <div className="p-left">
                        <FontAwesomeIcon icon={faUtensils} className="c-icon" />
                      </div>
                      <div className="p-right">
                        <h4>Food</h4>
                        <p>Healthy Meals</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {!editMode ? (
            <div data-aos="fade-left" className="right">
              <div className="p-header">
                <h2>other details</h2>
                <FontAwesomeIcon
                  className="icon-edit"
                  icon={faEdit}
                  onClick={() => setEditMode(!editMode)}
                />
              </div>
              <h4>Email : {profileData.email}</h4>
              <h4>Display Name : {profileData.displayName || "No Name"}</h4>
              <h4>Age : {profileData.age}</h4>
              <h4>Height : {profileData.height}</h4>
              <h4>Weight : {profileData.weight}</h4>
              <h4>Gender : {profileData.gender}</h4>
              <h4>Fitness Goal : {profileData.fitnessGoal}</h4>
            </div>
          ) : (
            <div className="footer">
              {" "}
              <div className="edit">
                <div className="input-faild">
                  <label>Display Name:</label>
                  <input
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="input-faild">
                  <label>Age:</label>
                  <input
                    name="age"
                    type="number"
                    value={profileData.age}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="input-faild">
                  <label>Height (CM):</label>
                  <input
                    name="height"
                    type="number"
                    value={profileData.height}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="input-faild">
                  <label>weight (KG):</label>
                  <input
                    name="weight"
                    type="number"
                    value={profileData.weight}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="input-faild">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    disabled={!editMode ? true : false}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>

                <div className="input-faild">
                  {" "}
                  <label>Fitness Goal:</label>
                  <select
                    name="fitnessGoal"
                    value={profileData.fitnessGoal}
                    onChange={handleChange}
                    disabled={!editMode}
                  >
                    <option value="bulking">bulking</option>
                    <option value="cutting">cutting</option>
                  </select>
                </div>
                <button className="save" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="buttons"></div>
      </div>
    </div>
  );
};

export default Profile;
