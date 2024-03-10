export const vi = {
  translation: {
    authentication: {
      login: {
        header: {
          title: "Đăng nhập.",
          subtitle: "It's quick and easy.",
        },
        email: {
          label: "Email address",
          required: "Email được yêu cầu",
          invalid: "Địa chỉ email không hợp lệ",
        },
        password: {
          label: "Mật khẩu",
          required: "ConfirmPassword được yêu cầu",
          invalid: "Mật khẩu không đúng",
        },
        success: "Đăng nhập thành công",
        confirmEmail: {
          text: "Bạn có chắc chắn mình đã xác nhận tài khoản của mình trong email không? Vì tài khoản của bạn chưa được xác nhận.",
          buttonSend: "Xác nhận email",
          buttonCancel: "Hủy",
        },
      },
      signup: {
        header: {
          title: "Đăng ký",
          subtitle: "Nhanh chóng và dễ dàng",
        },
        email: {
          label: "Địa chỉ email",
          required: "Email được yêu cầu",
          invalid: "Địa chỉ email không hợp lệ",
        },
        password: {
          label: "Mật khẩu",
          required: "Mật khẩu được yêu cầu",
          invalid: "Độ dài mật khẩu cần ít nhất 8 ký tự",
        },
        confirmpassword: {
          label: "Xác nhận mật khẩu",
          required: "Xác nhận mật khẩu được yêu cầu",
          invalid: "Mật khẩu không đúng",
        },
        firstname: {
          label: "Họ",
          required: "Họ được yêu cầu",
          invalid: "",
        },
        lastname: {
          label: "Tên",
          required: "Tên được yêu cầu",
          invalid: "",
        },
        age: {
          label: "Tuổi",
          required: "Chọn ngày sinh của bạn",
          invalid: "",
          max: "Bạn chưa đủ tuổi,ít nhất phải đủ 13 tuổi '{{ date }} đạt yêu cầu'",
        },
        gender: {
          label: "Giới tính",
          required: "Xin vui lòng chọn giới tính",
          invalid: "Xin vui lòng chọn giới tính",
        },
        button: "Đăng ký",
        success: "Đăng ký thành công",
      },
      codeconfirm: {
        title: "Nhập mã từ email của bạn",
        text: "Hãy cho chúng tôi biết rằng địa chỉ email này thuộc về bạn. Nhập mã từ email được gửi tới <1>{{email}}</1>",
        label: "Nhập mã code",
        buttonAccent: "Tiếp tục",
        buttonPrimary: "Cập nhật thông tin",
        link: "Gửi lại email",
        responseOk:
          "Bạn kiểm tra email nhé, chúng tôi gửi mã vào đó rồi quay lại đây nhập mã đó.",
        modal: {
          title: "Xác nhận email thành công!!!",
          text: "Chúc mừng bạn đã xác nhận email thành công, bây giờ bạn có thể đăng nhập và sử dụng dịch vụ.",
        },
      },
      footer: {
        signup: {
          title: "Đã có tài khoản?",
          link: "Đăng nhập ngay",
          note: "Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên qaSocialApp.",
          policy:
            "Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản,Chính sách quyền riêng tư và Chính sách cookie của chúng tôi.",
        },
        login: {
          title: "Chưa có tài khoản?",
          link: "Đăng ký ngay",
        },
      },
    },
    footer: {
      text: "Đã đăng ký bản quyền.",
    },
    profile: {
      about: {
        "1": "Tổng quan",
        "2": "Học tập và làm việc",
        "3": "Nơi sinh sống",
        "4": "Liên lạc và thông tin cơ bản",
        "5": "Gia đình và mối quan hệ",
        "6": "Chi tiết về bạn",
        "7": "Sự kiện trong cuộc sống",
        placedlived: {
          required: "Làm ơn chọn thành phố.",
        },
        contactandinfo: {
          header: "Thông tin liên lạc",
          gender: {
            label: "Giới tính",
            required: "Xin vui lòng chọn giới tính",
            invalid: "Xin vui lòng chọn giới tính",
          },
        },
        workandeducation: {
          work: {
            label: "Công việc",
            required: "Xin vui lòng nhập tên công ty.",
          },
          position: {
            label: "Vị trí",
          },
          start: {
            required: "Hãy chọn ngày khởi đầu.",
          },
          end: {
            invalid: "Ngày kết thúc không được trước ngày bắt đầu.",
          },
        },
      },
    },
    friends: {
      suggest: {
        btnAdd: "Thêm bạn",
        btnDel: "Xóa",
      },
    },
  },
};
