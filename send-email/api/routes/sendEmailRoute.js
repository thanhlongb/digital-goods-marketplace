const express = require("express");
const router = express.Router();

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });

// The subject line for the email.
SUBJECT = "Confirm awaiting order";

// The character encoding for the email.
CHARSET = "UTF-8";

// Email body template
BODY_HTML = `<!DOCTYPE html>
<html>
<body style="background-color:#EAECED; ">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    <style> @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  </style>
  <table align="center" bgcolor="#EAECED" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr style="font-size:0;line-height:0">
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td align="center" valign="top">
                <table width="600">
                    <tbody>
                        <tr>
                            <td align="center">
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top">
                                <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" style="overflow:hidden!important;border-radius:3px" width="580">
                                    <tbody>
                                        <tr>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table width="85%">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <h2 style="margin:0!important;font-family:'Open Sans',helvetica,arial,sans-serif!important;font-size:28px!important;line-height:38px!important;font-weight:200!important;color:#252b33!important">New Order Confirmation</h2>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" width="78%">
                                                    <tbody>
                                                        <tr>
                                                            <td align="left" style="font-family:'Open Sans',helvetica,arial,sans-serif!important;font-size:16px!important;line-height:30px!important;font-weight:100!important;color:#7e8890!important">
                                                                <p>You have received a new order for your selling product with Digital Marketplace.
                                                                    As always, we are here
                                                                    to help should you have any questions.</p>
                                                                <p>Please login to Digital Marketplace to confirm the awaiting product order</p>
                                                                <p>Kind regards</p>
                                                                <p>Digital Marketplace Team</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                            <tr>
                                <td align="center" style="font-family:'Open Sans',sans-serif!important;font-weight:400!important;color:#7e8890!important;font-size:11px!important;letter-spacing:.05em!important"
                                    valign="top"><em></em></td>
            </tr>
            <tr style="padding:0;margin:0;font-size:0;line-height:0">
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <p style="margin-bottom:1em;font-family:Open Sans,sans-serif!important;padding:0!important;margin:0!important;color:#7e8890!important;font-size:12px!important;font-weight:300!important">
                        <span>Digital Marketplace Ltd. Ho Chi Minh city, Vietnam</span></p>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            </td>
        </tr>
    </tbody>
</table>

  </body>
</html>
`;

// Text body template
BODY_TEXT = "TEST";

router.get("/sendEmail", async (req, res) => {
  // "From" address
  SENDER = "paulkevintornado@gmail.com";

  // "To" address
  RECIPIENT = req.query.email;
  // Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: [RECIPIENT],
    },
    Message: {
      Body: {
        Html: {
          Charset: CHARSET,
          Data: BODY_HTML,
        },
        Text: {
          Charset: CHARSET,
          Data: BODY_TEXT,
        },
      },
      Subject: {
        Charset: CHARSET,
        Data: SUBJECT,
      },
    },
    Source: SENDER,
    ReplyToAddresses: [RECIPIENT],
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log(data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
});

module.exports = router;
