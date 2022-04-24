var selectedAccess = "";
var selected_phone_number=""
let session= [];

let password_verification_username = ""
let password_verification_code = ""

// const API_HOST = "http://localhost:8082";
const API_HOST = "http://backendservice-dev.ap-south-1.elasticbeanstalk.com";
const S3_HOST = "https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public";

const API_PUBLIC_HOST = API_HOST + "/api/v1/public";
const API_PROTECTED_HOST = API_HOST + "/api/v1/auth";

let create_post =[];
let user_category_list =[];
let selected_accessId;
let open_createpost= true;
let breadcrumb = [];