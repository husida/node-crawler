class BaseController {
    
    setResult (code, msg='', data=null) {
        return {
            code: code,// 1:成功 0:失败  其他number
            msg: msg,
            data: data
        }
    }
}

module.exports = BaseController