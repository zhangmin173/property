;(function(win, lib){
    lib.validator = {
        //验证处理类
        types: {},
        //错误信息
        message:{},

        config:{},
        
        validate:function(data){
            var i, 
                msg, 
                type, 
                checker = [],
                tmp_check = [],
                check_len,
                result_ok;

            //清空错误信息
            for(i in data){
                checker = [],
                type = this.config[i];
                //可一次验证多个适应，用逗号隔开
                tmp_check = type.split(',');
                for(var j =0 ; j < tmp_check.length ; j++){
                    var tmp_type = tmp_check[j];
                    checker[j] = this.types[tmp_type];
                }

                if(!type){
                    //没有验证规则
                    continue;
                }
                else{
                    if(checker.length < 1){
                        throw {
                            name: "ValidationError",
                            message: "No handler to validate type " + type
                        };
                    }
                }
                check_len = checker.length;
                var error_span = $('.' + i + '-span-error');
                for (var k = 0; k < check_len ; k++) {
                    result_ok = checker[k].validate(data[i]);
                    if(!result_ok){
                        error_span.text(checker[k].instructions);
                        error_span.show();
                        break;
                    }
                    else{
                        error_span.hide();
                    }
                };


                
            }

        }
    }
    
    // 验证给定的值是否不为空
    lib.validator.types.isNonEmpty = {
        validate: function (value) {
            return $.trim(value) !== "";
        },
        instructions: "输入不能为空"
    };

    // 验证给定的值是否是数字
    lib.validator.types.isNumber = {
        validate: function (value) {
            return !isNaN(value);
        },
        instructions: "输入只能是数字"
    };
    // 验证给定的值是否是邮箱
    lib.validator.types.isEmail = {
        validate: function (value) {
            return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
        },
        instructions: "输入必须是邮箱"
    };

    // 验证给定的值是否只是字母或数字
    lib.validator.types.isAlphaNum = {
        validate: function (value) {
            return !/[^a-z0-9]/i.test(value);
        },
        instructions: "输入只能是字母和数字"
    };

})(window, window.lib || (window.lib = {}))
