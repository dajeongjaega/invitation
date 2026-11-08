(function () {
  var EVENT_DATE = new Date("2026-12-24T00:00:00+09:00");

  var daysEl = document.getElementById("days");
  var hoursEl = document.getElementById("hours");
  var minutesEl = document.getElementById("minutes");
  var secondsEl = document.getElementById("seconds");
  var messageEl = document.getElementById("ddayMessage");
  var countdownEl = document.getElementById("countdown");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    var now = new Date();
    var diff = EVENT_DATE - now;

    if (diff <= 0) {
      countdownEl.style.display = "none";
      messageEl.textContent = "오늘은 다정재가복지센터 개소식 날입니다!";
      clearInterval(timer);
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
    messageEl.textContent = "개소식까지 " + days + "일 남았습니다.";
  }

  var timer = setInterval(tick, 1000);
  tick();

  var copyBtn = document.getElementById("copyBtn");
  var addressText = document.getElementById("addressText");

  if (copyBtn && addressText) {
    copyBtn.addEventListener("click", function () {
      var text = addressText.textContent.trim();

      function fallbackCopy() {
        var temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.focus();
        temp.select();
        try {
          document.execCommand("copy");
        } catch (e) {}
        document.body.removeChild(temp);
      }

      function showCopied() {
        var original = copyBtn.textContent;
        copyBtn.textContent = "복사됨!";
        setTimeout(function () {
          copyBtn.textContent = original;
        }, 1500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied, function () {
          fallbackCopy();
          showCopied();
        });
      } else {
        fallbackCopy();
        showCopied();
      }
    });
  }
})();
