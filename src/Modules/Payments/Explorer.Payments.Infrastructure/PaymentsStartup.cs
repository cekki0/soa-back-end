﻿using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Explorer.Payments.Core.Domain.ShoppingCarts;
using Explorer.Payments.Core.Mappers;
using Explorer.Payments.Core.UseCases;
using Explorer.Payments.Infrastructure.Database;
using Explorer.Payments.Infrastructure.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Explorer.Payments.Infrastructure;

public static class PaymentsStartup
{
    public static IServiceCollection ConfigurePaymentsModule(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(PaymentsProfile).Assembly);
        SetupCore(services);
        SetupInfrastructure(services);
        return services;
    }

    private static void SetupCore(IServiceCollection services)
    {
        services.AddScoped(typeof(IShoppingCartRepository), typeof(ShoppingCartDatabaseRepository));
        services.AddScoped<IShoppingCartService, ShoppingCartService>();

        services.AddScoped<IOrderItemService, OrderItemService>();

        services.AddScoped<ITourTokenService, TourTokenService>();
    }

    private static void SetupInfrastructure(IServiceCollection services)
    {
        services.AddScoped(typeof(ICrudRepository<ShoppingCart>), typeof(CrudDatabaseRepository<ShoppingCart, PaymentsContext>));

        services.AddScoped(typeof(ICrudRepository<OrderItem>), typeof(CrudDatabaseRepository<OrderItem, PaymentsContext>));

        services.AddScoped(typeof(ICrudRepository<TourToken>), typeof(CrudDatabaseRepository<TourToken, PaymentsContext>));

        services.AddDbContext<PaymentsContext>(opt =>
            opt.UseNpgsql(DbConnectionStringBuilder.Build("payments"),
                x => x.MigrationsHistoryTable("__EFMigrationsHistory", "payments")));
    }
}