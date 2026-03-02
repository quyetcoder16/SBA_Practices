package fu.se.lab4_he186796.service.impl;

import fu.se.lab4_he186796.dto.request.OrchidRequest;
import fu.se.lab4_he186796.dto.response.OrchidResponse;
import fu.se.lab4_he186796.entity.Orchid;
import fu.se.lab4_he186796.exception.AppException;
import fu.se.lab4_he186796.exception.ErrorCode;
import fu.se.lab4_he186796.repository.OrchidRepository;
import fu.se.lab4_he186796.service.OrchidService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class OrchidServiceImpl implements OrchidService {
    OrchidRepository orchidRepository;

    @Override
    public OrchidResponse createOrchid(OrchidRequest request) {
        Orchid orchid = Orchid.builder()
                .orchidName(request.getOrchidName())
                .isNatural(request.isNatural())
                .orchidDescription(request.getOrchidDescription())
                .orchidCategory(request.getOrchidCategory())
                .isAttractive(request.isAttractive())
                .orchidURL(request.getOrchidURL())
                .build();
        orchid = orchidRepository.save(orchid);
        return mapToResponse(orchid);
    }

    @Override
    public OrchidResponse getOrchid(int id) {
        Orchid orchid = orchidRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));
        return mapToResponse(orchid);
    }

    @Override
    public List<OrchidResponse> getAllOrchids() {
        return orchidRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrchidResponse updateOrchid(int id, OrchidRequest request) {
        Orchid orchid = orchidRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));

        orchid.setOrchidName(request.getOrchidName());
        orchid.setNatural(request.isNatural());
        orchid.setOrchidDescription(request.getOrchidDescription());
        orchid.setOrchidCategory(request.getOrchidCategory());
        orchid.setAttractive(request.isAttractive());
        orchid.setOrchidURL(request.getOrchidURL());

        orchid = orchidRepository.save(orchid);
        return mapToResponse(orchid);
    }

    @Override
    public void deleteOrchid(int id) {
        Orchid orchid = orchidRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));
        orchidRepository.delete(orchid);
    }

    private OrchidResponse mapToResponse(Orchid orchid) {
        return OrchidResponse.builder()
                .orchidID(orchid.getOrchidID())
                .orchidName(orchid.getOrchidName())
                .isNatural(orchid.isNatural())
                .orchidDescription(orchid.getOrchidDescription())
                .orchidCategory(orchid.getOrchidCategory())
                .isAttractive(orchid.isAttractive())
                .orchidURL(orchid.getOrchidURL())
                .build();
    }
}
