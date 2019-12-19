import React from "react";
import "./UserProfileSummary.css";
import avatarImage from './tempImages/tempAvatar.jpg'

function UserProfileSummary(props){
	return (
		<><div className="profile-summary-container">
		<div><img className="avatar" src={avatarImage}></img></div>
		<div className="profile-summary-text">
			<div>Joey Genfi</div>
			<div>NarutoFan93</div>
		</div>
		</div>
		</>
	);
}

export default UserProfileSummary;