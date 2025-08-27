$(document).ready(function () {
    let pagenum = 1;
    const limit = 10;
    let loading = false;
    let hasmore = true;

    async function fetchposts(page, limit) {
        if (loading || !hasmore) return; // لا تحمل مرتين معًا
        loading = true;

        const url = `https://retoolapi.dev/6fIvBA/data?_page=${pagenum}&_limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.length === 0) {
            hasmore = false; // مافيش بيانات جديدة
            return;
        }
        //loop in data and display in html
        data.forEach(item => {
            $('.feed-posts').append(`
                <div class="post-item border rounded p-3 mb-3">
                    <div class="post-author d-flex align-items-center mb-2">
                        <div class="post-avatar bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style="width:40px; height:40px;">
                            ${item.userId}
                        </div>
                        <div class="post-author-info">
                            <div class="post-author-name fw-bold">User ${item.userId}</div>
                            <div class="post-timestamp text-muted small">Just now</div>
                        </div>
                    </div>
                    <div class="post-content">
                        <h6>${item.title}</h6>
                        <
                        <p>${item.body}The correct word is article, not “artical.” An article refers 
                        to a piece of writing included with others in a newspaper, magazine, or other publication. The word “artical” is a common misspelling and does not exist in English.

                             For example, you might say, “I read an interesting article
                   about health in a magazine.” This shows how to use the word correctly
                       while indicating its practical application in everyday language.</p>
                        <img src="https://picsum.photos/400/200?random=${item.id}" class="img-fluid rounded mt-2" alt="Post image">
                    </div>
                </div>
            `);
        });

        loading = false;
    }

    // أول تحميل
    fetchposts(pagenum, limit);

    // gett  new data when reach 100 px from page(scroll)
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            if (!loading && hasmore) {
                pagenum++;
                fetchposts(pagenum, limit);
            }
        }
    });




    // validatin in sign up
    $(document).ready(function () {
        $('form.needs-validation').on('submit', function (e) {
            const form = this;

            if (!form.checkValidity()) {
                e.preventDefault();  // stop

            }

            // apear invalid and valid feed back class thereisnt else as add "was-validated" must add after any submit withot condition 
            //as it show valid , invalid
            $(form).addClass('was-validated');
        });
    });

    //validation login 
    $(document).ready(function () {
        // 'use strict';

        $('#loginForm').on('submit', function (e) {
            const form = this;

            if (!form.checkValidity()) {
                e.preventDefault();

            } else {
                e.preventDefault(); // علشان نتحكم في التحويل
                // local storage
                // read data
                const email = $('#email').val();
                const password = $('#password').val();

                //تlocalStorage
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);


                // اgo html
                window.location.href = 'home.html';
            }

            $(form).addClass('was-validated');
        });
    });


});

// Global event handlers for navigation
$('.nav-link').on('click', function (e) {
    const href = $(this).attr('href');
    if (href && href !== '#') {
        e.preventDefault();
        window.location.href = href;
    }
});

// Form input focus effects
$('.form-control').on('focus', function () {
    $(this).parent().addClass('focused');
}).on('blur', function () {
    $(this).parent().removeClass('focused');
});


