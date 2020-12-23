package jh.mastercloud.toposervice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "City not found")
public class CityNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 965494398556263050L;

}
