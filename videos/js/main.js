(function (exports) {
  "use strict";

  var offlineMessage = document.getElementById("offline-message");
  var offlineMessageSettingsButton = offlineMessage.querySelector(".settings-button");
  var offlineMessageReloadButton = offlineMessage.querySelector(".reload-button");

  offlineMessageReloadButton.onclick = () => {
    location.reload();
  };

  var splashscreen = document.getElementById("splashscreen");
  var optionsButton = document.getElementById("options-button");
  var profileButton = document.getElementById("profile-button");
  var profileAvatar = document.getElementById("profile-avatar");

  var sidebar = document.getElementById("sidebar");
  var toggleSidebarButton = document.getElementById("toggle-sidebar-button");

  window.addEventListener("load", function () {
    function initializeUser() {
      if (OrchidServices.isUserLoggedIn) {
        OrchidServices.getWithUpdate(
          "profile/" + OrchidServices.userId(),
          function (data) {
            profileButton.title = data.username;
            profileAvatar.alt = data.username;
            if (data.profile_picture !== "") {
              profileAvatar.src = data.profile_picture;
            } else {
              profileAvatar.src = "/images/profile_pictures/avatar_default.svg";
            }
          }
        );
        optionsButton.style.display = "none";
      } else {
        profileButton.style.display = "none";
      }
    }

    if (navigator.onLine) {
      initializeUser();
    } else {
      offlineMessage.classList.add('visible');
      profileButton.style.display = "none";
    }

    splashscreen.classList.add("hidden");
  });

  toggleSidebarButton.addEventListener("click", () => {
    sidebar.classList.toggle("visible");
  });
})(window);
