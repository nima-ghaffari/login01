document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register-link');
    const showLoginLink = document.getElementById('show-login-link');
    const loginSwitcher = document.querySelector('.form-switcher.login');
    const registerSwitcher = document.querySelector('.form-switcher.register');
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let backgroundState = 'default';
    let backgroundStateTimeout;

    const setBackgroundState = (state, duration) => {
        backgroundState = state;
        formContainer.classList.remove('error-shadow', 'success-shadow');
        if (state === 'error') {
            formContainer.classList.add('error-shadow');
        } else if (state === 'success') {
            formContainer.classList.add('success-shadow');
        }

        clearTimeout(backgroundStateTimeout);
        if (duration) {
            backgroundStateTimeout = setTimeout(() => {
                backgroundState = 'default';
                formContainer.classList.remove('error-shadow', 'success-shadow');
            }, duration);
        }
    };

    const switchForms = (formToShow, formToHide, switcherToShow, switcherToHide) => {
        formContainer.classList.add('switching');
        setBackgroundState('switching', 250);
        formToHide.classList.add('fade-out');
        switcherToHide.classList.add('fade-out');

        setTimeout(() => {
            formToHide.classList.add('hidden');
            switcherToHide.classList.add('hidden');
            formToHide.classList.remove('fade-out');
            switcherToHide.classList.remove('fade-out');
            formToShow.classList.remove('hidden');
            switcherToShow.classList.remove('hidden');
            formContainer.classList.remove('switching');
        }, 250);
    };

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms(registerForm, loginForm, registerSwitcher, loginSwitcher);
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms(loginForm, registerForm, loginSwitcher, registerSwitcher);
    });

    const showFormMessage = (form, message, isError) => {
        const messageElement = form.querySelector('.form-message');
        const button = form.querySelector('button');
        messageElement.textContent = message;
        messageElement.className = 'form-message visible';
        button.className = '';
        if (isError) {
            messageElement.classList.add('form-message-error');
            button.classList.add('btn-invalid');
            setBackgroundState('error', 1500);
        } else {
            messageElement.classList.add('form-message-success');
            button.classList.add('btn-valid');
            setBackgroundState('success', 3000);
        }
        setTimeout(() => {
            messageElement.classList.remove('visible');
            button.className = '';
        }, 3000);
    };

    const allInputs = document.querySelectorAll('.form-container input');
    const debounce = (func, delay = 1000) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const setError = (input, message) => {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = message;
        inputGroup.classList.add('invalid');
        inputGroup.classList.remove('valid');
        setBackgroundState('error', 1500);
    };

    const setSuccess = (input) => {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = '';
        inputGroup.classList.add('valid');
        inputGroup.classList.remove('invalid');
    };

    const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateField = (input) => {
        const value = input.value.trim();
        switch (input.id) {
            case 'register-username':
                value === '' ? setError(input, 'Username is required') : setSuccess(input);
                break;
            case 'login-email':
            case 'register-email':
                if (value === '') {
                    setError(input, 'Email is required');
                } else if (!isValidEmail(value)) {
                    setError(input, 'Provide a valid email');
                } else {
                    setSuccess(input);
                }
                break;
            case 'register-phone':
                value === '' ? setError(input, 'Phone number is required') : setSuccess(input);
                break;
            case 'login-password':
            case 'register-password':
                if (value === '') {
                    setError(input, 'Password is required');
                } else if (value.length < 8) {
                    setError(input, 'Password must be at least 8 characters');
                } else {
                    setSuccess(input);
                }
                const confirmPass = document.getElementById('register-confirm-password');
                if (input.id === 'register-password' && confirmPass.value !== '') {
                    validateField(confirmPass);
                }
                break;
            case 'register-confirm-password':
                const password = document.getElementById('register-password').value.trim();
                if (value === '') {
                    setError(input, 'Please confirm your password');
                } else if (value !== password) {
                    setError(input, "Passwords don't match");
                } else {
                    setSuccess(input);
                }
                break;
        }
        checkFormValidity(input.form);
    };

    const checkFormValidity = (form) => {
        const inputs = form.querySelectorAll('input');
        const button = form.querySelector('button');
        let isFormValid = true;
        let hasInvalidField = false;
        inputs.forEach(input => {
            const inputGroup = input.parentElement;
            if (!inputGroup.classList.contains('valid')) {
                isFormValid = false;
            }
            if (inputGroup.classList.contains('invalid')) {
                hasInvalidField = true;
            }
        });
        button.classList.remove('btn-valid', 'btn-invalid');
        if (hasInvalidField) {
            button.classList.add('btn-invalid');
        } else if (isFormValid) {
            button.classList.add('btn-valid');
            setBackgroundState('success', 3000);
        }
    };
    
    const debouncedValidateField = debounce(validateField);
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            debouncedValidateField(input);
        });
    });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const inputs = loginForm.querySelectorAll('input');
        let allValid = true;
        inputs.forEach(input => {
            if (!input.parentElement.classList.contains('valid')) { allValid = false; }
        });
        if (allValid) {
            showFormMessage(loginForm, 'Login Successful!', false);
        } else {
            showFormMessage(loginForm, 'Please correct the errors.', true);
        }
    });

    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const inputs = registerForm.querySelectorAll('input');
        let allValid = true;
        inputs.forEach(input => {
            if (!input.parentElement.classList.contains('valid')) { allValid = false; }
        });
        if (allValid) {
            showFormMessage(registerForm, 'Sign Up Successful!', false);
        } else {
            showFormMessage(registerForm, 'Please fill all fields correctly.', true);
        }
    });

    const originalTitle = document.title;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = 'I miss you! :(';
        } else {
            document.title = originalTitle;
        }
    });
    
    const setupCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    let mousePath = [];
    const MAX_PATH_LENGTH = 30;

    if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            mousePath.push({ x: e.clientX, y: e.clientY });
            if (mousePath.length > MAX_PATH_LENGTH) {
                mousePath.shift();
            }
        });
    }
    
    const rainChars = '01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * (canvas.height / fontSize)));

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;
        
        let rainColor;
        switch(backgroundState) {
            case 'error': rainColor = 'rgba(220, 40, 40, 0.9)'; break;
            case 'success': rainColor = 'rgba(40, 220, 40, 0.9)'; break;
            case 'switching': rainColor = 'rgba(230, 230, 255, 0.9)'; break;
            default: rainColor = 'rgba(0, 80, 220, 0.9)';
        }

        for (let i = 0; i < drops.length; i++) {
            const text = rainChars[Math.floor(Math.random() * rainChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillStyle = rainColor;
            ctx.fillText(text, x, y);
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        if (!isTouchDevice && mousePath.length > 1) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            for (let i = 1; i < mousePath.length; i++) {
                const progress = i / (mousePath.length - 1);
                const opacity = progress * 0.8;
                const lineWidth = progress * 4;
                ctx.beginPath();
                ctx.moveTo(mousePath[i-1].x, mousePath[i-1].y);
                ctx.lineTo(mousePath[i].x, mousePath[i].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = lineWidth;
                ctx.shadowColor = 'white';
                ctx.shadowBlur = 10;
                ctx.stroke();
            }
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(draw);
    }
    
    draw();
});