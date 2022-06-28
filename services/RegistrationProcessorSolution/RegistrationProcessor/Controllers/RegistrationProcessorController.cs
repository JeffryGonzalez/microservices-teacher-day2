global using Microsoft.AspNetCore.Mvc;
global using Dapr;
using Dapr.Client;
using Registrations.Types;
using Google.Protobuf.WellKnownTypes;

namespace RegistrationProcessor.Controllers;


[ApiController]
public class RegistrationProcessorController : ControllerBase
{
    private readonly ILogger<RegistrationProcessorController> _logger;
    private readonly DaprClient _client;


    public RegistrationProcessorController(ILogger<RegistrationProcessorController> logger, DaprClient client)
    {
        _logger = logger;
        _client = client;
    }


    [Topic("registrations", "registration-requested")]
    [HttpPost("registrations")]

    public async Task<ActionResult> ProcessRegistration([FromBody] CreateRegistrationRequestModel request)
    {
        _logger.LogInformation("Got a registration!: " + request);

        var statusUpdate = new RegistrationStatusChanged
        {
            RequestId = request.RequestId,
            Status = RegistrationStatusChanged.Types.Status.Processing,
            Timestamp = Timestamp.FromDateTime(DateTime.Now.ToUniversalTime())
    

        };
        await _client.PublishEventAsync("registrations", "registration-status-update", statusUpdate);

        return Ok(); // success status code.
    }
}


// Timestamp = Timestamp.FromDateTime(DateTime.Now.ToUniversalTime()),