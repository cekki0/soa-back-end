using AutoMapper;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Dtos.TouristEquipment;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.ShoppingCarts;
using Explorer.Tours.Core.Domain.Tours;
using System.Linq;

namespace Explorer.Tours.Core.Mappers;

public class ToursProfile : Profile
{
    public ToursProfile()
    {
        CreateMap<EquipmentResponseDto, Equipment>().ReverseMap();
        CreateMap<EquipmentCreateDto, Equipment>().ReverseMap();
        CreateMap<EquipmentUpdateDto, Equipment>().ReverseMap();

        CreateMap<ReviewCreateDto, Review>().ReverseMap();
        CreateMap<ReviewUpdateDto, Review>().ReverseMap();
        CreateMap<ReviewResponseDto, Review>().ReverseMap();

        CreateMap<TourResponseDto, Tour>().ReverseMap();
        CreateMap<TourCreateDto, Tour>().ReverseMap();
        CreateMap<TourUpdateDto, Tour>().ReverseMap().ForMember(dest => dest.Durations, opt => opt.MapFrom(src => src.Durations.Select(d => new TourDuration(d.Duration, (Domain.Tours.TransportType)d.TransportType))));
        CreateMap<TourResponseDto, Tour>().ReverseMap().ForMember(dest => dest.Durations, opt => opt.MapFrom(src => src.Durations.Select(d => new TourDuration(d.Duration, (Domain.Tours.TransportType)d.TransportType))));

        CreateMap<FacilityResponseDto, Facility>().ReverseMap();
        CreateMap<FacilityCreateDto, Facility>().ReverseMap();
        CreateMap<FacilityUpdateDto, Facility>().ReverseMap();

        CreateMap<KeyPointDto, KeyPoint>().ReverseMap();

        CreateMap<PreferenceResponseDto, Preference>().ReverseMap();
        CreateMap<PreferenceCreateDto, Preference>().ReverseMap();
        CreateMap<PreferenceUpdateDto, Preference>().ReverseMap();

        CreateMap<TouristEquipmentResponseDto, TouristEquipment>().ReverseMap();
        CreateMap<TouristEquipmentCreateDto, TouristEquipment>().ReverseMap();
        CreateMap<TouristEquipmentUpdateDto, TouristEquipment>().ReverseMap();

        CreateMap<PublicKeyPointRequestCreateDto, PublicKeyPointRequest>().ReverseMap();
        CreateMap<PublicKeyPointRequestResponseDto, PublicKeyPointRequest>().ReverseMap();
        CreateMap<PublicKeyPointRequestUpdateDto, PublicKeyPointRequest>().ReverseMap();

        CreateMap<PublicFacilityRequestCreateDto, PublicFacilityRequest>().ReverseMap();
        CreateMap<PublicFacilityRequestResponseDto, PublicFacilityRequest>().ReverseMap();
        CreateMap<PublicFacilityRequestUpdateDto, PublicFacilityRequest>().ReverseMap();

        CreateMap<TourDurationResponseDto, TourDuration>().ReverseMap(); // Caos hehe, lepasimozebroj? ;))
        CreateMap<TourDurationUpdateDto, TourDuration>().ReverseMap(); // ONATRAZILAMIBROJSVIDJAJOJSEROLEKSMOJ
        CreateMap<PublicFacilityNotificationResponseDto, PublicFacilityNotification>().ReverseMap();
        CreateMap<PublicFacilityNotificationCreateDto, PublicFacilityNotification>().ReverseMap();

        CreateMap<PublicKeyPointNotificationResponseDto, PublicKeyPointNotification>().ReverseMap();
        CreateMap<PublicKeyPointNotificationCreateDto, PublicKeyPointNotification>().ReverseMap();

        CreateMap<PublicKeyPointResponseDto, PublicKeyPoint>().ReverseMap();
        CreateMap<PublicKeyPointCreateDto, PublicKeyPoint>().ReverseMap();


        CreateMap<ShoppingCartResponseDto, ShoppingCart>().ReverseMap().ForMember(x => x.OrderItems, opt => opt.MapFrom(src => src.OrderItems));
        CreateMap<ShoppingCartCreateDto, ShoppingCart>().ReverseMap();
        CreateMap<ShoppingCartUpdateDto, ShoppingCart>().ReverseMap();

        CreateMap<OrderItemResponseDto, OrderItem>().ReverseMap();
        CreateMap<OrderItemCreateDto, OrderItem>().ReverseMap();
        CreateMap<OrderItemUpdateDto, OrderItem>().ReverseMap();




    }
}