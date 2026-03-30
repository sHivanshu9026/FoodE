import React from "react";
import Navbar from "../components/Navbar";
import { BiShield } from "react-icons/bi";
import tncnpbg from "./tncnp.jpeg";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${tncnpbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // height: "100vh",
        // width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "1rem",
          marginTop: "7rem",
          margin: "5rem",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>
          Privacy Policy <BiShield />
        </h1>

        <div
          className=" p-4"
          style={{
            marginBottom: "30px",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <h3>Information Collection and Use</h3>
          <ul>
            <li>
              We may collect personal information, including but not limited to
              name, email address, phone number, delivery address, and payment
              details, when you use our services.
            </li>
            <li>
              This information is used to facilitate food orders, improve our
              services, communicate with users, and process payments.
            </li>
          </ul>

          <h3>Cookies and Tracking Technologies</h3>
          <ul>
            <li>
              Our website may use cookies and similar tracking technologies to
              enhance user experience and collect information about your
              interactions with our website.
            </li>
            <li>
              Cookies are used for authentication, preferences, analytics, and
              advertising purposes.
            </li>
          </ul>

          <h3>Data Sharing and Disclosure</h3>
          <ul>
            <li>
              We may share personal information with third-party service
              providers or partner restaurants to fulfill orders, process
              payments, and improve services.
            </li>
            <li>
              We do not sell or rent personal information to third parties for
              marketing purposes.
            </li>
          </ul>

          <h3>Data Security</h3>
          <ul>
            <li>
              We implement reasonable security measures to protect personal
              information from unauthorized access, disclosure, alteration, or
              destruction.
            </li>
            <li>
              However, no method of transmission over the internet or electronic
              storage is completely secure. Therefore, we cannot guarantee
              absolute security.
            </li>
          </ul>

          <h3>User Rights and Choices</h3>
          <ul>
            <li>
              Users may access, correct, update, or delete their personal
              information by contacting us.
            </li>
            <li>
              Users may opt-out of receiving promotional communications from us
              by following the unsubscribe instructions provided in the emails.
            </li>
          </ul>

          <h3>Children's Privacy</h3>
          <ul>
            <li>
              Our services are not directed to individuals under the age of 13.
              We do not knowingly collect personal information from children
              under 13.
            </li>
          </ul>

          <h3>Changes to Privacy Policy</h3>
          <ul>
            <li>
              We reserve the right to modify this Privacy Policy at any time.
              Any changes will be effective upon posting the revised Privacy
              Policy on this page.
            </li>
          </ul>

          <h3>Contact Information</h3>
          <ul>
            <li>
              If you have any questions or concerns about our Privacy Policy or
              data practices, please contact us at +916391058103.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
