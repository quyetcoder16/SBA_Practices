package fu.se.a2_quyetdx_he186796_se1941jv.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // Generic
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key", HttpStatus.BAD_REQUEST),
    VALIDATION_ERROR(1002, "Validation error", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1003, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1004, "You do not have permission", HttpStatus.FORBIDDEN),

    // SystemAccount
    USER_NOT_FOUND(2001, "User not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(2002, "User with this email already exists", HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(2003, "Invalid email or password", HttpStatus.UNAUTHORIZED),
    USER_HAS_ARTICLE(2004, "User has article(s) and cannot be deleted", HttpStatus.BAD_REQUEST),

    // Category
    CATEGORY_NOT_FOUND(3001, "Category not found", HttpStatus.NOT_FOUND),
    CATEGORY_HAS_ASSOCIATED_ARTICLES(3002, "Category has associated article(s) and cannot be deleted", HttpStatus.BAD_REQUEST),

    // NewsArticle
    NEWS_ARTICLE_NOT_FOUND(4001, "News article not found", HttpStatus.NOT_FOUND),

    // Tag
    TAG_NOT_FOUND(5001, "Tag not found", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(int code, String message, HttpStatus statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatus statusCode;
}