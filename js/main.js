(function () {
  'use strict';

  /* ============================================
     Sticky header shadow/border on scroll
     ============================================ */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================
     Mobile menu
     ============================================ */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    var open = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  }
  navToggle.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ============================================
     Scroll reveal animations
     ============================================ */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ============================================
     FAQ accordion
     ============================================ */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        answer.style.maxHeight = '0px';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ============================================
     Interactive Growth Assessment
     ============================================ */
  (function assessment() {
    var form = document.getElementById('assessmentForm');
    if (!form) return;

    var steps = Array.prototype.slice.call(form.querySelectorAll('.assessment-step'));
    var questionSteps = steps.filter(function (s) { return s.dataset.step !== 'result'; });
    var resultStep = form.querySelector('[data-step="result"]');
    var progressFill = document.getElementById('progressFill');
    var stepIndicator = document.getElementById('stepIndicator');
    var prevBtn = document.getElementById('prevStepBtn');
    var nextBtn = document.getElementById('nextStepBtn');
    var nav = document.getElementById('assessmentNav');
    var resultRecs = document.getElementById('resultRecs');

    var current = 0; // index into questionSteps
    var answers = {};

    function showStep(idx) {
      questionSteps.forEach(function (s, i) {
        s.classList.toggle('active', i === idx);
      });
      resultStep.classList.remove('active');
      progressFill.style.width = (((idx + 1) / questionSteps.length) * 100) + '%';
      stepIndicator.textContent = 'Step ' + (idx + 1) + ' of ' + questionSteps.length;
      prevBtn.disabled = idx === 0;
      nextBtn.textContent = idx === questionSteps.length - 1 ? 'See Results' : 'Next';
      nav.style.display = 'flex';
    }

    function currentGroup() {
      return questionSteps[current].querySelector('.option-grid').dataset.group;
    }

    questionSteps.forEach(function (step) {
      var grid = step.querySelector('.option-grid');
      var group = grid.dataset.group;
      grid.querySelectorAll('.option-card').forEach(function (card) {
        card.addEventListener('click', function () {
          grid.querySelectorAll('.option-card').forEach(function (c) { c.classList.remove('selected'); });
          card.classList.add('selected');
          answers[group] = card.dataset.value;
          step.querySelector('.assessment-error').classList.remove('show');
        });
      });
    });

    nextBtn.addEventListener('click', function () {
      var group = currentGroup();
      if (!answers[group]) {
        questionSteps[current].querySelector('.assessment-error').classList.add('show');
        return;
      }
      if (current < questionSteps.length - 1) {
        current++;
        showStep(current);
      } else {
        renderResult();
      }
    });

    prevBtn.addEventListener('click', function () {
      if (current > 0) {
        current--;
        showStep(current);
      }
    });

    var NEED_RECS = {
      'new-site': { title: 'Business Website Development', desc: 'A new site built around your business goals, from information architecture to launch.' },
      'redesign': { title: 'Website Design & Redesign', desc: 'Modernize your existing site with a clearer design and improved conversion path.' },
      'store': { title: 'Ecommerce Development', desc: 'An online store built to handle real transaction volume and convert browsers into buyers.' },
      'app': { title: 'Custom Web Applications', desc: 'A business portal or tool engineered around your specific workflow.' }
    };
    var PRIORITY_RECS = {
      speed: { title: 'Website Maintenance', desc: "Once you're live, ongoing support keeps the site secure and current without slowing you down." },
      design: { title: 'Website Design & Redesign', desc: 'Strong visual design and brand feel are central to a redesign engagement.' },
      functionality: { title: 'Custom Web Applications', desc: 'Specific functionality needs often call for custom development rather than a template.' },
      seo: { title: 'Business Website Development', desc: 'Search-ready architecture is built in from the first line of code, not bolted on after launch.' }
    };
    var PLATFORM_RECS = {
      wordpress: { title: 'WordPress Development', desc: 'We can build on and extend your existing WordPress platform.' }
    };

    function renderResult() {
      questionSteps.forEach(function (s) { s.classList.remove('active'); });
      resultStep.classList.add('active');
      nav.style.display = 'none';
      stepIndicator.textContent = 'Results';
      progressFill.style.width = '100%';

      var recs = [];
      var r1 = NEED_RECS[answers.need];
      var r2 = PRIORITY_RECS[answers.priority];
      var r3 = PLATFORM_RECS[answers.platform];
      if (r1) recs.push(r1);
      if (r3 && (!r1 || r3.title !== r1.title)) recs.push(r3);
      if (r2 && !recs.some(function (r) { return r.title === r2.title; })) recs.push(r2);
      if (recs.length === 0) {
        recs.push({ title: 'Discovery Call', desc: "Your situation is specific enough that we'd recommend talking it through directly." });
      }

      resultRecs.innerHTML = '';
      recs.slice(0, 3).forEach(function (rec) {
        var div = document.createElement('div');
        div.className = 'result-rec';
        var strong = document.createElement('strong');
        strong.textContent = rec.title;
        var span = document.createElement('span');
        span.textContent = rec.desc;
        div.appendChild(strong);
        div.appendChild(span);
        resultRecs.appendChild(div);
      });
    }

    showStep(0);
  })();

  /* ============================================
     Contact form validation + mock submission
     ============================================ */
  (function contactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var submitBtn = document.getElementById('submitBtn');
    var statusEl = document.getElementById('formStatus');

    var validators = {
      fullName: function (v) { return v.trim().length >= 2; },
      businessEmail: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      companyName: function (v) { return v.trim().length >= 2; },
      serviceInterest: function (v) { return v.trim().length > 0; },
      projectDesc: function (v) { return v.trim().length >= 10; }
    };

    function fieldGroup(name) {
      return document.getElementById('group-' + ({
        fullName: 'name', businessEmail: 'email', companyName: 'company',
        serviceInterest: 'service', projectDesc: 'message'
      }[name]));
    }

    function validateField(name) {
      var el = form.elements[name];
      var group = fieldGroup(name);
      var valid = validators[name](el.value);
      group.classList.toggle('invalid', !valid);
      return valid;
    }

    Object.keys(validators).forEach(function (name) {
      var el = form.elements[name];
      el.addEventListener('blur', function () { validateField(name); });
      el.addEventListener('input', function () {
        if (fieldGroup(name).classList.contains('invalid')) validateField(name);
      });
    });

    function setStatus(type, message) {
      statusEl.textContent = message;
      statusEl.className = 'form-status show ' + type;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: if filled, silently drop (bot submission)
      if (form.elements.companyWebsite && form.elements.companyWebsite.value) {
        return;
      }

      var allValid = Object.keys(validators).every(validateField);
      if (!allValid) {
        setStatus('error', 'Please fix the highlighted fields and try again.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      submitBtn.querySelector('.btn-text').textContent = 'Sending…';
      statusEl.className = 'form-status';

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        if (response.ok) {
          form.reset();
          setStatus('success', "Thanks — we've received your message and will follow up shortly.");
        } else {
          response.json().then(function (data) {
            var detail = (data && data.errors && data.errors.length) ? ' (' + data.errors.map(function (e) { return e.message; }).join(', ') + ')' : '';
            setStatus('error', 'Something went wrong sending your message' + detail + '. Please try again or email us directly.');
          }).catch(function () {
            setStatus('error', 'Something went wrong sending your message. Please try again or email us directly.');
          });
        }
      }).catch(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        setStatus('error', 'Could not reach the server. Please check your connection and try again.');
      });
    });
  })();

  /* ============================================
     Dynamic copyright year
     ============================================ */
  var yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
