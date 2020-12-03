$(function () {
    var form = layui.form
    var player = layui.player
    // 切换注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide().siblings('.reg-box').show()
    })
    // 切换登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide()
    })

    // 验证密码
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6到16位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 监听表单注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()

            }
        })
    })

    // 监听表单的登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                console.log(res);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})