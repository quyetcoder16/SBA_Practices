package fu.se.lab5_he186796.service;

import fu.se.lab5_he186796.dto.request.OrchidRequest;
import fu.se.lab5_he186796.dto.response.OrchidResponse;

import java.util.List;

public interface OrchidService {
    OrchidResponse createOrchid(OrchidRequest request);

    OrchidResponse getOrchid(int id);

    List<OrchidResponse> getAllOrchids();

    OrchidResponse updateOrchid(int id, OrchidRequest request);

    void deleteOrchid(int id);
}
