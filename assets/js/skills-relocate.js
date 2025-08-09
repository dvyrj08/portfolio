(function () {
  const mq = window.matchMedia("(max-width: 1200px)");
  const skills = document.getElementById("skills");
  const projects = document.getElementById("projects");

  if (!skills || !projects) return;

  // Save original location to restore on desktop
  const originalParent = skills.parentNode;
  const originalNext = skills.nextSibling; // can be null

  function insertAfter(referenceNode, newNode) {
    if (!referenceNode || !referenceNode.parentNode) return;
    if (referenceNode.nextSibling) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
      referenceNode.parentNode.appendChild(newNode);
    }
  }

  function moveToMobileLayout() {
    // Ensure skills sits immediately AFTER projects
    if (skills.previousElementSibling !== projects) {
      insertAfter(projects, skills);
    }
  }

  function restoreDesktopLayout() {
    if (skills.parentNode !== originalParent) {
      originalParent.insertBefore(skills, originalNext);
    }
  }

  function handle() {
    if (mq.matches) moveToMobileLayout();
    else restoreDesktopLayout();
  }

  handle();
  (mq.addEventListener ? mq.addEventListener("change", handle) : mq.addListener(handle));
  let tid=null; window.addEventListener("resize", ()=>{ clearTimeout(tid); tid=setTimeout(handle,150); });
})();