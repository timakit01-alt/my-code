const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const closeSuccessMessage = document.getElementById('closeSuccessMessage');
let lastActive = null;

openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

closeBtn.addEventListener('click', () => dlg.close('cancel'));

form.addEventListener('submit', (e) => {
    Array.from(form.elements).forEach(el => {
        if (el.setCustomValidity) {
            el.setCustomValidity('');
            el.removeAttribute('aria-invalid');
        }
    });
    if (!form.checkValidity()) {
        e.preventDefault();
        const email = form.elements.email;
        if (email && email.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }

        const phone = form.elements.phone;
        if (phone && phone.validity.patternMismatch) {
            phone.setCustomValidity('Введите телефон в формате: +7 (900) 000-00-00');
        }

        form.reportValidity();

        Array.from(form.elements).forEach(el => {
            if (el.willValidate && !el.checkValidity()) {
                el.setAttribute('aria-invalid', 'true');
            }
        });
        
        return;
    }

    e.preventDefault();
    
    dlg.close('success');
    

    successMessage.hidden = false;
    
    form.reset();
});

closeSuccessMessage.addEventListener('click', () => {
    successMessage.hidden = true;
    lastActive?.focus();
});

dlg.addEventListener('close', () => {
    lastActive?.focus();
});
const phone = document.getElementById('phone');
phone?.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    const normalized = digits.replace(/^8/, '7');

    const parts = [];
    if (normalized.length > 0) parts.push('+7');
    if (normalized.length > 1) parts.push(' (' + normalized.slice(1, 4));
    if (normalized.length >= 4) parts[parts.length - 1] += ')';
    if (normalized.length >= 5) parts.push(' ' + normalized.slice(4, 7));
    if (normalized.length >= 8) parts.push('-' + normalized.slice(7, 9));
    if (normalized.length >= 10) parts.push('-' + normalized.slice(9, 11));

    phone.value = parts.join('');
});