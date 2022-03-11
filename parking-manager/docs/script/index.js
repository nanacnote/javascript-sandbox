let thisAdmin, thisDriver, thisLot, thisPayment, thisRequest, thisMessage;

// -- html injections --
$("#register-form-request-lot-uid").click(function () {
  if ($("#register-form-request-lot-uid").children().length === 1) {
    PMS.getLots().then((list) => {
      $.each(list, function (i, item) {
        $("#register-form-request-lot-uid").append(
          $("<option>", {
            value: item.uid,
            text: item.name,
          })
        );
      });
    });
  }
});
$("#register-form-request-payment-uid").click(function () {
  if ($("#register-form-request-payment-uid").children().length === 1) {
    PMS.getThisPayments().then((list) => {
      $.each(list, function (i, item) {
        $("#register-form-request-payment-uid").append(
          $("<option>", {
            value: item.uid,
            text: item.name,
          })
        );
      });
    });
  }
});
$("#send-form-message-admin-to-user-uid").click(function () {
  if ($("#send-form-message-admin-to-user-uid").children().length === 1) {
    PMS.getDrivers().then((list) => {
      $.each(list, function (i, item) {
        $("#send-form-message-admin-to-user-uid").append(
          $("<option>", {
            value: item.uid,
            text: item.name,
          })
        );
      });
    });
  }
});

// -- admin login --
$("#login-form-admin").submit(async function (event) {
  event.preventDefault();
  const name = $("#login-form-admin-name").val();
  const password = $("#login-form-admin-password").val();
  thisAdmin = await new PMS.Admin({ name, password }).login();
  console.log(thisAdmin);
});

// -- driver login --
$("#login-form-driver").submit(async function (event) {
  event.preventDefault();
  const email = $("#login-form-driver-email").val();
  const password = $("#login-form-driver-password").val();
  thisDriver = await new PMS.Driver({ email, password }).login();
  console.log(thisDriver);
});

// -- admin registration --
$("#register-form-admin").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-admin-name").val();
  const password = $("#register-form-admin-password").val();
  thisAdmin = await new PMS.Admin({ name, password }).register();
  console.log(thisAdmin);
});

// -- driver registration --
$("#register-form-driver").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-driver-name").val();
  const email = $("#register-form-driver-email").val();
  const password = $("#register-form-driver-password").val();
  thisDriver = await new PMS.Driver({ name, email, password }).register();
  console.log(thisDriver);
});

// -- lot registration --
$("#register-form-lot").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-lot-name").val();
  const coordinate = $("#register-form-lot-coordinate").val();
  const capacity = $("#register-form-lot-capacity").val();
  thisLot = await new PMS.Lot({ name, coordinate, capacity }).register();
  console.log(thisLot);
});

// -- payment registration --
$("#register-form-payment").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-payment-name").val();
  const ccn = $("#register-form-payment-card-no").val();
  const ccv = $("#register-form-payment-ccv").val();
  const exp = $("#register-form-payment-expiry-date").val();
  thisPayment = await new PMS.Payment({
    driverUID: thisDriver.uid,
    name,
    ccn,
    ccv,
    exp,
  }).register();
  console.log(thisPayment);
});

// -- request registration --
$("#register-form-request").submit(async function (event) {
  event.preventDefault();
  const lotUID = $("#register-form-request-lot-uid").val();
  const paymentUID = $("#register-form-request-payment-uid").val();
  const start = $("#register-form-request-start").val();
  const end = $("#register-form-request-end").val();
  thisRequest = await new PMS.Request({
    lotUID,
    paymentUID,
    start,
    end,
  }).send();
  console.log(thisRequest);
});

// -- admin message sending --
$("#send-form-message-admin").submit(async function (event) {
  event.preventDefault();
  const toUserUIDS = $("#send-form-message-admin-to-user-uid").val();
  const title = $("#send-form-message-admin-title").val();
  const content = $("#send-form-message-admin-content").val();
  thisMessage = await new PMS.Message({
    fromUserUID: thisAdmin.uid,
    toUserUIDS,
    title,
    content,
  }).send();
  console.log(thisMessage);
});

// -- driver message sending --
$("#send-form-message-driver").submit(async function (event) {
  event.preventDefault();
  const title = $("#send-form-message-driver-title").val();
  const content = $("#send-form-message-driver-content").val();
  thisMessage = await new PMS.Message({
    fromUserUID: thisDriver.uid,
    toUserUIDS: [thisAdmin.uid],
    title,
    content,
  }).send();
  console.log(thisMessage);
});
