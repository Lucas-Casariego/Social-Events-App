using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Application.Core;

public class MappingProfiles : Profile
{
	public MappingProfiles()
	{
		CreateMap<Activity, Activity>();
	}
}
