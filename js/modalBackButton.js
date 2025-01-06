$(document).ready(function() {
  var modalState = false; // Track if the modal is open

  // Track modal opening
  $('.modal').on('show.bs.modal', function() {
      if (!modalState) {
          // Push a new history state when the modal is opened
          history.pushState({ modalOpen: true }, null, window.location.href);
          modalState = true; // Set modal state to open
      }
  });

  // Track modal closing
  $('.modal').on('hide.bs.modal', function() {
      if (modalState) {
          // Pop the state when the modal is closed
          history.back();
          modalState = false; // Set modal state to closed
      }
  });

  // Handle the back button action
  $(window).on('popstate', function(event) {
      if (event.originalEvent.state && event.originalEvent.state.modalOpen) {
          // Close the modal if it's open and the state indicates it's modal-related
          var openModal = $('.modal.show');
          if (openModal.length > 0) {
              openModal.modal('hide'); // Close the modal
          }
      } else {
          // Reload the page when going back to the homepage (after modal is closed)
          location.reload();
      }
  });
});
